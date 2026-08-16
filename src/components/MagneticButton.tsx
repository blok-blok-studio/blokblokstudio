'use client';

/**
 * Editorial redesign: the cursor-follow "magnetic" effect is retired.
 * This is now a plain passthrough wrapper so existing call sites keep
 * working. Remove usages over time and use plain elements instead.
 */

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  as?: 'button' | 'div';
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className = '',
  as = 'button',
  onClick,
}: MagneticButtonProps) {
  const Component = as;
  return (
    <Component onClick={onClick} className={className}>
      {children}
    </Component>
  );
}
