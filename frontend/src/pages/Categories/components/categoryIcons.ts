import {
  BriefcaseBusinessIcon,
  CarFrontIcon,
  HeartPulseIcon,
  PiggyBankIcon,
  ShoppingCartIcon,
  TicketIcon,
  ToolCaseIcon,
  UtensilsIcon,
  PawPrintIcon,
  HouseIcon,
  GiftIcon,
  DumbbellIcon,
  BookOpenIcon,
  BaggageClaimIcon,
  MailboxIcon,
  ReceiptTextIcon,
  TagIcon,
  type LucideIcon,
} from 'lucide-react'

export const DEFAULT_CATEGORY_ICON = 'tag'

export const CATEGORY_ICONS: { name: string; icon: LucideIcon }[] = [
  { name: 'briefcase', icon: BriefcaseBusinessIcon },
  { name: 'car-front', icon: CarFrontIcon },
  { name: 'heart-pulse', icon: HeartPulseIcon },
  { name: 'piggy-bank', icon: PiggyBankIcon },
  { name: 'shopping-cart', icon: ShoppingCartIcon },
  { name: 'ticket', icon: TicketIcon },
  { name: 'tool-case', icon: ToolCaseIcon },
  { name: 'utensils', icon: UtensilsIcon },
  { name: 'paw-print', icon: PawPrintIcon },
  { name: 'house', icon: HouseIcon },
  { name: 'gift', icon: GiftIcon },
  { name: 'dumbbell', icon: DumbbellIcon },
  { name: 'book-open', icon: BookOpenIcon },
  { name: 'baggage-claim', icon: BaggageClaimIcon },
  { name: 'mailbox', icon: MailboxIcon },
  { name: 'receipt-text', icon: ReceiptTextIcon },
]

const ICON_MAP: Record<string, LucideIcon> = Object.fromEntries(
  CATEGORY_ICONS.map(({ name, icon }) => [name, icon])
)

export function getCategoryIcon(name?: string | null): LucideIcon {
  return (name && ICON_MAP[name]) || TagIcon
}
