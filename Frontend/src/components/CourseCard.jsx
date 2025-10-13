// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Star, Clock, ExternalLink } from "lucide-react";

// export function CourseCard({ course }) {
//   const getLevelColor = (level) => {
//     switch (level) {
//       case 'beginner':
//         return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
//       case 'intermediate':
//         return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
//       case 'expert':
//         return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
//       default:
//         return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
//     }
//   };

//   return (
//     <Card className="h-full hover:shadow-lg transition-shadow duration-200">
//       <CardHeader>
//         <div className="flex justify-between items-start gap-2">
//           <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
//           <Badge className={getLevelColor(course.level)}>
//             {course.level}
//           </Badge>
//         </div>
//         <div className="flex items-center gap-4 text-sm text-muted-foreground">
//           <span className="font-medium">{course.provider}</span>
//           <div className="flex items-center gap-1">
//             <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//             <span>{course.rating}</span>
//           </div>
//         </div>
//       </CardHeader>
      
//       <CardContent className="space-y-4">
//         <p className="text-sm text-muted-foreground line-clamp-3">
//           {course.description}
//         </p>
        
//         <div className="flex flex-wrap gap-1">
//           {course.skills.map((skill) => (
//             <Badge key={skill} variant="outline" className="text-xs">
//               {skill}
//             </Badge>
//           ))}
//         </div>
        
//         <div className="flex items-center justify-between text-sm">
//           <div className="flex items-center gap-1 text-muted-foreground">
//             <Clock className="w-4 h-4" />
//             <span>{course.duration}</span>
//           </div>
//           <div className="font-semibold text-primary">
//             {course.price}
//           </div>
//         </div>
        
//         <Button 
//           asChild 
//           className="w-full"
//           variant="outline"
//         >
//           <a href={course.url} target="_blank" rel="noopener noreferrer">
//             <ExternalLink className="w-4 h-4 mr-2" />
//             View Course
//           </a>
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }