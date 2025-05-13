
const LoadingSpinner = () => {

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/60">
         <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500" />
      </div>
   )
}

export default LoadingSpinner