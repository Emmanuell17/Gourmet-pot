type PageHeaderProps = {
  title: string
  subtitle?: string
  isLoaded?: boolean
}

export default function PageHeader({ title, subtitle, isLoaded = true }: PageHeaderProps) {
  return (
    <div
      className={`text-center mb-12 transition-all duration-1000 ease-out ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <h1 className="font-display text-5xl md:text-6xl font-extrabold mb-4 text-white tracking-wider">
        {title}
      </h1>
      {subtitle && <p className="text-xl text-white/90">{subtitle}</p>}
    </div>
  )
}
