/**
 * SectionHeading — H2 de sección (Baloo 2 700) con tono claro u oscuro.
 *
 * Un solo `<h1>` en toda la página (el del hero); cada bloque abre con su H2 y
 * los ítems/pasos usan H3. El texto llega ya traducido (`t('…')`), nunca literal.
 * Los doodles se colocan desde el bloque, no aquí.
 *
 * Uso:
 *   <SectionHeading id="kit-title">{t('kit.title')}</SectionHeading>
 */
const SIZES = {
  md: 'text-[clamp(1.55rem,6vw,2.3rem)]',
  lg: 'text-[clamp(1.7rem,6.5vw,2.75rem)]',
}

export default function SectionHeading({
  children,
  id,
  as: Tag = 'h2',
  tone = 'light',
  size = 'lg',
  align = 'left',
  className = '',
}) {
  const color = tone === 'ink' ? 'text-tinta' : 'text-crema'
  const position = align === 'center' ? 'text-center' : 'text-left'

  return (
    <Tag
      id={id}
      className={`font-display font-bold ${color} ${SIZES[size] ?? SIZES.lg} ${position} ${className}`}
    >
      {children}
    </Tag>
  )
}
