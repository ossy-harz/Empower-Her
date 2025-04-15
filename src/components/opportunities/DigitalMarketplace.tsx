import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingBag, Star } from "lucide-react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  seller: {
    name: string;
    location: string;
    rating: number;
  };
  image: string;
}

export default function DigitalMarketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Mock product data
  const products: Product[] = [
    {
      id: 1,
      title: "Handcrafted Jewelry Set",
      description:
        "Beautiful handmade jewelry set with traditional Ugandan designs.",
      price: 45,
      category: "crafts",
      seller: {
        name: "Amara Crafts",
        location: "Kampala",
        rating: 4.8,
      },
      image:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
    },
    {
      id: 2,
      title: "Organic Shea Butter",
      description: "100% natural shea butter, ethically sourced and produced.",
      price: 15,
      category: "beauty",
      seller: {
        name: "Natural Beauty Co.",
        location: "Jinja",
        rating: 4.6,
      },
      image:
        "https://images.unsplash.com/photo-1597931752949-98c74b5b159a?w=500&q=80",
    },
    {
      id: 3,
      title: "Handwoven Basket",
      description:
        "Traditional handwoven basket made from sustainable materials.",
      price: 35,
      category: "home",
      seller: {
        name: "Kampala Crafters",
        location: "Kampala",
        rating: 4.9,
      },
      image:
        "https://images.unsplash.com/photo-1595231776515-ddffb1f4eb73?w=500&q=80",
    },
    {
      id: 4,
      title: "Digital Marketing Course",
      description:
        "Comprehensive digital marketing course for small businesses.",
      price: 75,
      category: "services",
      seller: {
        name: "Digital Skills Academy",
        location: "Entebbe",
        rating: 4.7,
      },
      image:
        "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=500&q=80",
    },
  ];

  // Filter products based on search query and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-background">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="crafts">Crafts</SelectItem>
              <SelectItem value="beauty">Beauty & Wellness</SelectItem>
              <SelectItem value="home">Home & Living</SelectItem>
              <SelectItem value="services">Services</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden flex flex-col">
            <div className="aspect-video w-full overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{product.title}</CardTitle>
                <Badge variant="secondary">${product.price}</Badge>
              </div>
              <CardDescription className="line-clamp-2">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2 flex-grow">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span className="font-medium">{product.seller.name}</span>
                <span>•</span>
                <span>{product.seller.location}</span>
              </div>
              <div className="flex items-center mt-1">
                <Star className="h-3.5 w-3.5 fill-primary text-primary mr-1" />
                <span className="text-sm">{product.seller.rating}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <ShoppingBag className="mr-2 h-4 w-4" /> View Product
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No products found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}
