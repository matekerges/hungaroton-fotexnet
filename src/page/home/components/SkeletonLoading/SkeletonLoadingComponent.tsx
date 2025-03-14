import { Card, CardContent, Skeleton } from "@mui/material";

const SkeletonLoadingComponent = () => {
    return (
        <div className="flex flex-wrap gap-4 justify-center">
            {Array.from({ length: 24 }).map((_, index) => (
                <Card key={index} className="w-full md:w-[200px] ">
                    <div className="aspect-square">
                        <Skeleton variant="rectangular" className="!h-full !w-full" />
                    </div>
                    <CardContent className="h-[104px]">
                        <Skeleton variant="text" height={28} />
                        <Skeleton variant="text" height={28} width={60} />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default SkeletonLoadingComponent;
