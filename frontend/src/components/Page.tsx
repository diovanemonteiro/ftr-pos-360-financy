interface PageProps {
  children: React.ReactNode
}

export function Page({ children }: PageProps) {
  return (
    <div className="min-h-[calc(100vh-9rem)] bg-white rounded-lg p-8 mt-4 border border-gray-200">
      {children}
    </div>
  )
}
