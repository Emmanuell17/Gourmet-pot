import Image from 'next/image'

type PageBackgroundProps = {
  variant?: 'hero' | 'default'
}

export default function PageBackground({ variant = 'default' }: PageBackgroundProps) {
  const overlay =
    variant === 'hero'
      ? 'from-black/60 via-black/50 to-black/60'
      : 'from-black/70 via-black/60 to-black/70'

  return (
    <div className="fixed inset-0 z-0">
      <Image
        src="/background.jpg"
        alt=""
        fill
        className="object-cover"
        priority={variant === 'hero'}
      />
      <div className={`absolute inset-0 bg-gradient-to-b ${overlay}`} />
      {variant === 'default' && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,165,0,0.1)_0%,transparent_50%)] animate-pulse" />
        </div>
      )}
    </div>
  )
}
