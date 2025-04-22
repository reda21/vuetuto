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
  onChange?: (event: Event) => void;
  onClick?: (event: MouseEvent) => void;
}
