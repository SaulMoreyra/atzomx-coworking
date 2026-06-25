# Menu images — upload checklist

Replace files at the paths below. No code changes needed when filenames match.

## Global fallback

| File | Used when |
|------|-----------|
| `public/images/menu/default-item.png` | Any item without a photo |

## Category fallbacks

| Category | Placeholder file | Replace with |
|----------|------------------|--------------|
| `lunch` | `default-lunch.png` | Hero bowl/sandwich photo |
| `smoothies` | `default-smoothie.png` | Smoothie category photo |
| `combos` | `default-combo.png` | Combo plates photo |
| `dessert` | `default-dessert.png` | Dessert photo |
| `frappes` | `default-frappe.png` | Frappe photo |
| `extras` | `default-extras.png` | Extras/drinks photo |
| `italian-sodas` | `default-soda.png` | Italian soda photo |

## Missing item images (mock paths)

### Combos
- `/images/food/el-mananero.webp`
- `/images/food/bradfitt.webp`
- `/images/food/freelancer.webp`

### Smoothies
- `/images/food/tropical-smoothie.webp`
- `/images/food/mango-smoothie.webp`
- `/images/food/green-smoothie.webp`

### Lunch
- `/images/food/house-salad.webp`
- `/images/food/red-berry-bowl.webp`
- `/images/food/chocolate-bowl.webp`

### Extras
- `/images/food/choco-latte.webp`
- `/images/food/topo-chico.webp`
- `/images/food/tea.webp`

### Dessert
- `/images/food/bread-of-the-day.webp`

### Italian sodas (category not yet in catalog)
- `/images/food/pineapple-soda.webp` through `/images/food/strawberry-glitter-soda.webp`

## Space gallery (home `#gallery`)

| Tile ID | Current placeholder | Replace file |
|---------|---------------------|--------------|
| `terrace` | `coworking/puff.webp` | `coworking/terrace.webp` |
| `desks` | `coworking/standar.webp` | `coworking/desks.webp` |
| `meeting-room` | `coworking/meeting-room.webp` | ✓ real photo |
| `coffee-bar` | `coworking/coffeebar.webp` | ✓ real photo |
| `monitor-desk` | `coworking/monitor.webp` | ✓ real photo |
| `facade` | `coworking/atzomx.webp` | ✓ real photo |
| `community` | `coworking/lunch.webp` | `coworking/community.webp` |
| `latte-art` | `coworking/art-latte.webp` | ✓ real photo |

Global gallery fallback: `public/images/coworking/default-space.webp`

Config: `src/design-system/gallery.ts`
