export type ButtonType = 'button' | 'submit' | 'reset';
export type ElementType = 'button' | 'a' | 'input';

export type Variant = 'soft' | 'outlined' | 'subtle' | 'ghost' | 'link' | undefined;

export type Severity =
  | 'secondary'
  | 'success'
  | 'info'
  | 'warn'
  | 'help'
  | 'danger'
  | 'contrast'
  | undefined;

export type SizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

type RoundedType =  'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export interface ButtonProps {
  variant?: Variant;
  severity?: Severity;
  size?: SizeType;
  label?: string;
  ariaLabel?: string;
  icon?: string;
  iconPos?: 'left' | 'right' | 'top' | 'bottom';
  type?: ButtonType;
  lazy?: boolean;
  disabled?: boolean;
  as?: ElementType;
  href?: string; // Optionnel, pour le cas d'un lien
  rounded?: RoundedType;
  raised?: boolean;
  full?: boolean;
  bsPrefix?: string;
  active?: boolean;
  badge?: number;
  // Propriétés ARIA courantes pour l'accessibilité
  ariaExpanded?: boolean;
  ariaPressed?: boolean;
  ariaDescribedby?: string;
  ariaControls?: string;
  ariaHaspopup?: boolean | string;
  ariaCurrent?: string;
  ariaLive?: string;
  ariaAtomic?: boolean;
  ariaRelevant?: string;
  ariaDisabled?: boolean;
  ariaHidden?: boolean;
  ariaLabelledby?: string;
  onChange?: (event: Event) => void;
  onClick?: (event: MouseEvent) => void;
  onDblClick?: (event: MouseEvent) => void;
  onMouseenter?: (event: MouseEvent) => void;
  onMouseleave?: (event: MouseEvent) => void;
  onTouchstart?: (event: TouchEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onAnimationend?: (event: AnimationEvent) => void;
  onAnimationstart?: (event: AnimationEvent) => void;
  onTransitionend?: (event: TransitionEvent) => void;
  onMousedown?: (event: MouseEvent) => void;
  onMouseup?: (event: MouseEvent) => void;
  onKeydown?: (event: KeyboardEvent) => void;
  onKeyup?: (event: KeyboardEvent) => void;
}
