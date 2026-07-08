// Mock account data — backend API mavjud bo'lmagani uchun frontendda saqlanadi.

export const mockUser = {
  id: 'usr-1024',
  firstName: 'Aziz',
  lastName: 'Karimov',
  email: 'aziz.karimov@example.com',
  phone: '+998 90 123 45 67',
  birthday: '1998-05-14',
  gender: 'male',
  avatar: null,
}

export const mockAddresses = [
  {
    id: 'addr-1',
    label: 'Uy',
    fullName: 'Aziz Karimov',
    phone: '+998 90 123 45 67',
    region: 'Toshkent shahri',
    district: 'Chilonzor tumani',
    street: "Bunyodkor ko'chasi 12",
    apartment: '45-xonadon',
    isDefault: true,
  },
  {
    id: 'addr-2',
    label: 'Ish',
    fullName: 'Aziz Karimov',
    phone: '+998 90 123 45 67',
    region: 'Toshkent shahri',
    district: 'Yunusobod tumani',
    street: "Amir Temur ko'chasi 108",
    apartment: '',
    isDefault: false,
  },
]

export const defaultNotificationSettings = {
  orderUpdates: { label: 'Buyurtma holati', desc: "Buyurtmangiz qabul qilinishi, jo'natilishi va yetkazilishi haqida", email: true, sms: true, push: true },
  promotions: { label: 'Aksiya va chegirmalar', desc: 'Maxsus takliflar va chegirmalar haqida xabarlar', email: true, sms: false, push: true },
  newsletter: { label: 'Yangiliklar', desc: 'NEONE kolleksiyalari va yangiliklari', email: false, sms: false, push: false },
  security: { label: 'Xavfsizlik ogohlantirishlari', desc: 'Hisobingizga kirish va parol o\u2018zgarishi haqida', email: true, sms: true, push: true },
}

export const regions = [
  'Toshkent shahri',
  'Toshkent viloyati',
  "Andijon viloyati",
  'Farg\u2018ona viloyati',
  'Namangan viloyati',
  'Samarqand viloyati',
  'Buxoro viloyati',
  'Qashqadaryo viloyati',
  'Surxondaryo viloyati',
  'Navoiy viloyati',
  'Jizzax viloyati',
  'Sirdaryo viloyati',
  'Xorazm viloyati',
  "Qoraqalpog'iston Respublikasi",
]
