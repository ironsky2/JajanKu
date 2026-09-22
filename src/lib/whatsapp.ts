import { cleanPhoneNumber, formatRupiah } from "./utils";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";

export interface CheckoutFormData {
  name: string;
  waNumber: string;
  address: string;
  deliveryOption: "pickup" | "delivery";
  notes?: string;
}

export function generateCartWhatsAppUrl(
  sellerName: string,
  sellerPhone: string,
  items: CartItem[],
  total: number,
  customerData: CheckoutFormData
): string {
  const cleanPhone = cleanPhoneNumber(sellerPhone);

  const itemDetails = items
    .map((item) => {
      const subtotal = item.product.price * item.quantity;
      return `- ${item.product.name} x${item.quantity} — ${formatRupiah(subtotal)}`;
    })
    .join("\n");

  const deliveryText = customerData.deliveryOption === "pickup" ? "Pickup (Ambil Sendiri)" : "Delivery (Antar ke Rumah)";
  const notesText = customerData.notes?.trim() ? customerData.notes.trim() : "-";

  const message = `Halo ${sellerName}, saya ingin memesan:

🛒 *Detail Pesanan:*
${itemDetails}

💰 *Total:* ${formatRupiah(total)}

👤 *Data Pemesan:*
- Nama: ${customerData.name}
- No. WA: ${customerData.waNumber}
- Alamat: ${customerData.address}
- Pengiriman: ${deliveryText}
- Catatan: ${notesText}

Mohon konfirmasi pesanan saya. Terima kasih! 🙏`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function generateDirectProductWhatsAppUrl(
  product: Product,
  sellerName: string,
  sellerPhone: string,
  quantity: number = 1
): string {
  const cleanPhone = cleanPhoneNumber(sellerPhone);
  const total = product.price * quantity;

  const message = `Halo ${sellerName}, saya mau pesan langsung:

🛒 *Produk:* ${product.name}
🔢 *Jumlah:* ${quantity} ${product.unit}
💰 *Harga Satuan:* ${formatRupiah(product.price)}
💵 *Total:* ${formatRupiah(total)}

Apakah produk ini masih tersedia? Terima kasih! 🙏`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function generateAdminContactWhatsAppUrl(
  adminPhone: string = "6281371087296",
  topic: string = "pendaftaran penjual"
): string {
  const cleanPhone = cleanPhoneNumber(adminPhone);
  const message = `Halo Admin JajanKuy, saya ingin bertanya mengenai ${topic} di JajanKuy. Mohon bantuannya ya! 🙏`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
