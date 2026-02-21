import { memo } from "react";
import { ArrowRight } from "lucide-react";

export const ProductCard = memo(function ProductCard({ product, onSubmitMandate }) {
  return (
    <article className="relative shrink-0 w-[300px] sm:w-[340px] md:w-[380px] lg:w-[420px] aspect-4/5 overflow-hidden rounded-lg group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500">
      {/* Image as card background */}
      <img
        src={product.image}
        alt={product.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />

      {/* Card content */}
      <div className="relative h-full flex flex-col justify-end p-6 sm:p-7 md:p-8">
        {/* Content backdrop for enhanced readability */}
        <div className="backdrop-blur-sm bg-black/20 -mx-6 sm:-mx-7 md:-mx-8 px-6 sm:px-7 md:px-8 py-6 rounded-t-lg">
          <h3 className="text-white text-xl sm:text-2xl font-bold leading-tight mb-3 line-clamp-2 drop-shadow-lg">
            {product.title}
          </h3>

          <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3 drop-shadow-md">
            {product.description}
          </p>

          {/* CTA Button */}
          <button
            onClick={onSubmitMandate}
            className="btn-next w-full justify-center focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-black"
            aria-label={`Submit request for ${product.title}`}
          >
            <span className="relative z-10">Submit Request</span>
            <ArrowRight
              size={16}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </article>
  );
});

export default ProductCard;
