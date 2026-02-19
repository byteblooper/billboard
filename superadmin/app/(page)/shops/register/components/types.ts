export interface ShopManagerInfo {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
}

export interface ShopInfo {
  shopName: string;
  description: string;
  shop_contact_email: string;
  shop_contact_phone: string;
  shop_contact_address: string;
  location_city: string;
  location_zone: string;
  trade_licence: string;
  shop_open_at: string;
  shop_close_at: string;
}

export interface ShopRegistrationData {
  manager: ShopManagerInfo;
  shop: ShopInfo;
}

export type RegistrationStep = 'manager' | 'shop' | 'review';

export interface FormErrors {
  [key: string]: string;
}

export const BD_CITIES = [
  'Dhaka',
  'Chittagong',
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Rangpur',
  'Mymensingh',
  'Comilla',
  'Gazipur',
  'Narayanganj',
  'Bogra',
  'Jessore',
  'Cox\'s Bazar',
  'Dinajpur',
  'Brahmanbaria',
  'Tangail',
  'Savar',
  'Tongi',
  'Narsingdi',
];

export const BD_ZONES: Record<string, string[]> = {
  Dhaka: ['Gulshan', 'Banani', 'Dhanmondi', 'Uttara', 'Mirpur', 'Mohammadpur', 'Bashundhara', 'Tejgaon', 'Motijheel', 'Lalmatia', 'Khilgaon', 'Badda', 'Rampura', 'Farmgate', 'Downtown'],
  Chittagong: ['Agrabad', 'Nasirabad', 'GEC Circle', 'Chawkbazar', 'Patenga', 'Halishahar', 'Kotwali', 'Downtown'],
  Sylhet: ['Zindabazar', 'Amberkhana', 'Subidbazar', 'Laldighirpar', 'Downtown'],
  Rajshahi: ['Shaheb Bazar', 'New Market', 'Laxmipur', 'Kazla', 'Downtown'],
  Khulna: ['Boyra', 'Sonadanga', 'Khalishpur', 'Daulatpur', 'Downtown'],
  Barishal: ['Sadar', 'Nathullabad', 'Rupatali', 'Downtown'],
  Rangpur: ['Dhap', 'Jahaj Company More', 'Modern Area', 'Downtown'],
  Mymensingh: ['Charpara', 'Ganginar Par', 'Town Hall', 'Downtown'],
  Comilla: ['Kandirpar', 'Rajganj', 'Tomsom Bridge', 'Downtown'],
  Gazipur: ['Tongi', 'Board Bazar', 'Chowrasta', 'Downtown'],
  Narayanganj: ['Tanbazar', 'Chashara', 'Netaiganj', 'Downtown'],
};
