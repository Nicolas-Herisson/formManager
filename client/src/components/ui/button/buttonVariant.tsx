import { cva } from "class-variance-authority"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
    {
      variants: {
        variant: {
          default:
            "bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus-visible:ring-blue-500 hover:cursor-pointer",
          destructive:
            "bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-500 hover:cursor-pointer",
          outline:
            "border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 focus-visible:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 hover:cursor-pointer",
          secondary:
            "bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:ring-gray-500 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 hover:cursor-pointer",
          ghost:
            "text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500 dark:text-gray-200 dark:hover:bg-gray-700 hover:cursor-pointer",
          link: "text-blue-600 underline-offset-4 hover:underline focus-visible:ring-blue-500 dark:text-blue-400 hover:cursor-pointer",
        },
        size: {
          default: "h-9 px-4 py-2 text-sm",
          sm: "h-8 rounded px-3 text-xs",
          lg: "h-10 rounded-md px-6 text-base",
          icon: "h-9 w-9 p-0",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
)

export default buttonVariants;