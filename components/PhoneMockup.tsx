import Image from 'next/image'

/**
 * Transparent-background iPhone mockups (no baked heading). The site supplies
 * all headings/captions around them. A soft drop shadow lifts the device off the
 * light background. Fixed intrinsic ratio guarantees zero layout shift.
 */
export default function PhoneMockup({
  src,
  alt,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 70vw, 340px',
}: {
  src: string
  alt: string
  priority?: boolean
  className?: string
  sizes?: string
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={1200}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full"
      />
    </div>
  )
}
