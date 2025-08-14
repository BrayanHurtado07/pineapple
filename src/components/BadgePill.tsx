'use client';

import * as Tooltip from '@radix-ui/react-tooltip';
import { cva, type VariantProps } from 'class-variance-authority';
import { Flame, Sparkles, Star, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { cx } from '@/lib/cx';

const pill = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm ring-1 ring-inset',
  {
    variants: {
      variant: {
        bestseller: 'bg-emerald-600 ring-emerald-700',
        popular:    'bg-indigo-600  ring-indigo-700',
        new:        'bg-rose-600    ring-rose-700',
        sale:       'bg-orange-600  ring-orange-700',
      },
      glow: {
        true:  'shadow-[0_0_0_2px_rgba(255,255,255,.4)]',
        false: '',
      },
    },
    defaultVariants: { glow: true },
  }
);

type BadgeKind = 'bestseller' | 'popular' | 'new' | 'sale';

type Props = VariantProps<typeof pill> & {
  kind: BadgeKind;
  className?: string;
  children?: React.ReactNode; // texto que quieras
  tooltip?: string;
  pulse?: boolean; // animación sutil
};

const IconByKind: Record<BadgeKind, React.ElementType> = {
  bestseller: Star,
  popular: Sparkles,
  new: Flame,
  sale: Tag,
};

export function BadgePill({ kind, className, children, tooltip, pulse, ...rest }: Props) {
  const Icon = IconByKind[kind];

  const pillEl = (
    <motion.span
      className={cx(pill({ variant: kind, ...rest }), 'backdrop-blur', className)}
      initial={pulse ? { scale: 0.96, opacity: 0 } : false}
      animate={pulse ? { scale: 1, opacity: 1 } : undefined}
      transition={pulse ? { type: 'spring', stiffness: 300, damping: 20 } : undefined}
    >
      <Icon className="h-3.5 w-3.5" />
      <span className="leading-none">{children}</span>
    </motion.span>
  );

  if (!tooltip) return pillEl;

  return (
    <Tooltip.Provider delayDuration={150}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{pillEl}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            sideOffset={8}
            className="select-none rounded-md bg-black px-2 py-1 text-xs text-white shadow-lg"
          >
            {tooltip}
            <Tooltip.Arrow className="fill-black" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
