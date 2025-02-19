import React from 'react';
import { Package2, ListChecks, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const Description = ({ product }) => {
  if (!product?.description) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Main Description Card */}
      <Card>
        <CardHeader>
          <CardTitle>About this product</CardTitle>
          <CardDescription className="pt-4 text-justify text-xs sm:text-base leading-relaxed">
            {product.description}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Specifications Card */}
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center gap-2">
              <Package2 className="h-5 w-5 text-primary self-start" />
              <div className="space-y-1">
                <CardTitle>Specifications</CardTitle>
                <CardDescription>
                  Technical details and dimensions
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px]">
              <div className="divide-y">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <div className="text-base font-medium capitalize">
                          {key.replace(/_/g, ' ')}
                        </div>
                        <div className="text-base text-muted-foreground">
                          {value}
                        </div>
                      </div>
                      <Badge variant="outline" className="shrink-0">
                        {typeof value === 'number' ? 
                          value.toLocaleString() : 
                          value.toString().length > 20 ? 
                            value.toString().substring(0, 20) + '...' : 
                            value
                        }
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Features Card */}
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-primary self-start" />
              <div className="space-y-1">
                <CardTitle>Key Features</CardTitle>
                <CardDescription>
                  What makes this product special
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px]">
              <div className="divide-y">
                {Object.entries(product.features).map(([key, value]) => (
                  <div key={key} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-base">
                          {value}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Description;