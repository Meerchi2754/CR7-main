const Resource = require("../models/resourceSchema");
const History = require("../models/historySchema");

const addResource = async (req, res) => {
  try {
    // Check if request body is an array (bulk operation)
    if (Array.isArray(req.body)) {
      return addMultipleResources(req, res);
    }

    const { topic, level, subcategories } = req.body;
    
    if (!topic || !level || !subcategories) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide topic, level, and subcategories" 
      });
    }

    // Check if resource already exists with same topic AND level
    let resource = await Resource.findOne({ topic, level });
    
    if (resource) {
      // Update existing resource
      resource.subcategories = subcategories;
      await resource.save();
      
      return res.status(200).json({ 
        success: true, 
        message: "Resource updated successfully", 
        data: resource 
      });
    } else {
      // Create new resource
      resource = await Resource.create({
        topic,
        level,
        subcategories
      });
      
      return res.status(201).json({ 
        success: true, 
        message: "Resource created successfully", 
        data: resource 
      });
    }
  } catch (error) {
    console.error("Error adding resource:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error adding resource", 
      error: error.message 
    });
  }
};

const addMultipleResources = async (req, res) => {
  try {
    const resources = req.body;
    
    if (!Array.isArray(resources) || resources.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide an array of resources" 
      });
    }

    const results = {
      created: [],
      updated: [],
      failed: []
    };

    for (const resourceData of resources) {
      try {
        const { topic, level, subcategories } = resourceData;
        
        if (!topic || !level || !subcategories) {
          results.failed.push({ topic: topic || 'unknown', reason: 'Missing topic, level, or subcategories' });
          continue;
        }
        
        // Check if resource already exists with same topic AND level
        let resource = await Resource.findOne({ topic, level });
        
        if (resource) {
          // Update existing resource
          resource.subcategories = subcategories;
          await resource.save();
          results.updated.push(`${topic} (${level})`);
        } else {
          // Create new resource
          resource = await Resource.create({
            topic,
            level,
            subcategories
          });
          results.created.push(`${topic} (${level})`);
        }
      } catch (error) {
        results.failed.push({ 
          topic: resourceData.topic || 'unknown', 
          reason: error.message 
        });
      }
    }

    res.status(200).json({ 
      success: true, 
      message: "Bulk operation completed",
      results: {
        created: results.created.length,
        updated: results.updated.length,
        failed: results.failed.length,
        details: results
      }
    });
  } catch (error) {
    console.error("Error in bulk resource operation:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error processing bulk resources", 
      error: error.message 
    });
  }
};

const getresource = async (req, res) => {
  try {
    const { topic } = req.body;
    
    if (!topic) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide a topic name" 
      });
    }

    // Search for resource by topic (case-insensitive)
    const resource = await Resource.findOne({ 
      topic: { $regex: new RegExp(`^${topic}$`, 'i') } 
    });
    
    if (!resource) {
      return res.status(404).json({ 
        success: false, 
        message: `No resources found for topic: ${topic}` 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Resource found successfully", 
      data: resource 
    });
  } catch (error) {
    console.error("Error fetching resource:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching resource", 
      error: error.message 
    });
  }
};

const getAllTopics = async (req, res) => {
  try {
    // Get topic names and levels from all resources
    const resources = await Resource.find({}, { topic: 1, level: 1, _id: 0 });
    
    // Extract unique topic names (without duplicating by level)
    const uniqueTopics = [...new Set(resources.map(item => item.topic))];

    res.status(200).json({ 
      success: true, 
      message: "All topics retrieved successfully",
      count: uniqueTopics.length,
      data: uniqueTopics 
    });
  } catch (error) {
    console.error("Error fetching topics:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching topics", 
      error: error.message 
    });
  }
};

const getResourcesByTopic = async (req, res) => {
  try {
    const { topic } = req.params;
    
    if (!topic) {
      return res.status(400).json({
        success: false,
        message: 'Topic name is required'
      });
    }

    // Case-insensitive search for the topic
    const resources = await Resource.find({
      topic: { $regex: new RegExp(`^${topic}$`, 'i') }
    });

    if (!resources || resources.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No resources found for topic: ${topic}`
      });
    }

    return res.status(200).json({
      success: true,
      count: resources.length,
      data: resources
    });
  } catch (error) {
    console.error(`Error getting resources for topic: ${error}`);
    res.status(500).json({
      success: false,
      message: 'Error retrieving resources',
      error: error.message
    });
  }
};

const addVisitHistory = async (req, res) => {
  try {
    const { email, topic } = req.body;
    
    if (!email || !topic) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide email and topic" 
      });
    }

    // Create new history entry
    const historyEntry = await History.create({
      email,
      topic
    });
    
    return res.status(201).json({ 
      success: true, 
      message: "Visit history recorded successfully", 
      data: historyEntry 
    });
  } catch (error) {
    console.error("Error adding visit history:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error recording visit history", 
      error: error.message 
    });
  }
};

const getHistoryByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide email" 
      });
    }

    // Get all history entries for this email, sorted by most recent first
    const historyEntries = await History.find({ email }).sort({ createdAt: -1 });
    
    return res.status(200).json({ 
      success: true, 
      message: "History retrieved successfully", 
      count: historyEntries.length,
      data: historyEntries 
    });
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching history", 
      error: error.message 
    });
  }
};

const deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide history ID" 
      });
    }

    const deletedEntry = await History.findByIdAndDelete(id);
    
    if (!deletedEntry) {
      return res.status(404).json({ 
        success: false, 
        message: "History entry not found" 
      });
    }
    
    return res.status(200).json({ 
      success: true, 
      message: "History entry deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting history:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error deleting history", 
      error: error.message 
    });
  }
};

module.exports = { 
  addResource, 
  addMultipleResources, 
  getresource, 
  getAllTopics, 
  getResourcesByTopic,
  addVisitHistory,
  getHistoryByEmail,
  deleteHistory 
};
