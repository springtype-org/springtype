## Change Detection

One of the harder problems in programming is efficient and safe change detection,
caching and cache invalidation. And one of the worst ideas is too much 
abstraction when frameworks are doing so. Abstraction leads to generalization
and generalization in this matter often leads to inefficiencies.

This is why SpringType allows for granular control over change detection,
reactive logic execution, caching and cache invalidation.