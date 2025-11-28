
export default function LoadingDots() {
  return (
    <div className="flex space-x-2 items-center justify-center py-10">
      {[...Array(3)].map((_, i) => (
        <span
          key={i}
          className="w-4 h-4 rounded-full animate-bounce"
          style={{
            background: `linear-gradient(90deg, #6EE7B7, #3B82F6)`,
            animationDelay: `${i * 0.2}s`,
          }}
        ></span>
      ))}
      
    </div>
    )}