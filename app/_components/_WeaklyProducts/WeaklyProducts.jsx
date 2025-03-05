import { truncateText } from "@/lib/TruncateText";
import useStore from "@/Store/useStore";
import { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tag, ChevronLeft, ChevronRight } from "lucide-react";

const WeeklyProducts = () => {
  const { data, loading, fetchData } = useStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const products = data?.products || [];
  const weeklyProduct = products.filter((product) => product.flags.isWeeklyDeal);
  const limitedData = weeklyProduct.slice(0, 5);
  const maxLength = 20;

  const arrowStyles = {
    position: 'absolute',
    zIndex: 2,
    top: 'calc(50% - 15px)',
    cursor: 'pointer',
    background: 'rgba(0, 0, 0, 0.5)',
    border: 'none',
    borderRadius: '50%',
    padding: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Weekly Deals</h2>
        <Badge variant="secondary" className="bg-red-100 text-red-600">
          <Tag className="w-4 h-4 mr-1" />
          Special Offers
        </Badge>
      </div>

      <Card className="overflow-hidden shadow-lg">
        <CardContent className="p-0">
          <Carousel
            showArrows={true}
            showStatus={false}
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            renderArrowPrev={(onClickHandler, hasPrev) =>
              hasPrev && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  className="absolute left-4 z-10 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-all"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-800" />
                </button>
              )
            }
            renderArrowNext={(onClickHandler, hasNext) =>
              hasNext && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  className="absolute right-4 z-10 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-all"
                >
                  <ChevronRight className="w-6 h-6 text-gray-800" />
                </button>
              )
            }
          >
            {limitedData.length > 0 ? (
              limitedData.map((product) => (
                <div key={product._id} className="relative">
                  <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <div className="text-white">
                      <h3 className="text-xl font-semibold mb-2">
                        {truncateText(product.name, maxLength)}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">
                          ${product.price.sale || product.price.regular}
                        </span>
                        <Badge className="bg-red-500 text-white">
                          Weekly Deal
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-100">
                <p className="text-gray-500 text-lg">No products available</p>
              </div>
            )}
          </Carousel>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyProducts;