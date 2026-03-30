export interface HardwareItem {
  id: string;
  name: string;
  type: string;
  price: number;
  originalPrice: number | null;
  sold: number;
  description: string;
  specs: string[];
  images: string[];
}

export const hardwareData: HardwareItem[] = [
  { 
    id: 'epson-tm-t82iii',
    images: ['/assets/images/hardware/thermal.jpg', '/assets/images/hardware/thermal.jpg', '/assets/images/hardware/thermal.jpg'], 
    name: 'Epson TM-T82III', 
    type: 'Thermal Printer', 
    price: 2450000, 
    originalPrice: 2750000,
    sold: 150,
    description: 'Printer thermal legendaris dengan daya tahan luar biasa. Cocok untuk bisnis retail dan F&B yang membutuhkan kecepatan cetak tinggi tanpa hambatan.',
    specs: ['Printing 250mm/s', 'Auto Cutter', 'USB + RS232', 'Drop-in Paper Loading']
  },
  { 
    id: 'inforce-m-3100-at',
    images: ['/assets/images/hardware/scanner.jpg', '/assets/images/hardware/scanner.jpg', '/assets/images/hardware/scanner.jpg'], 
    name: 'Inforce M-3100 AT', 
    type: 'Wireless Scanner', 
    price: 850000, 
    originalPrice: 999000,
    sold: 85,
    description: 'Scanner barcode wireless dengan jangkauan sinyal hingga 100m. Mampu membaca barcode 1D dan 2D (QR Code) dengan sangat presisi.',
    specs: ['Wireless 2.4G', 'Scan 1D & 2D', 'Rechargeable', 'Long-life Trigger']
  },
  { 
    id: 'inforce-apt-410-rj11',
    images: ['/assets/images/hardware/cash.png', '/assets/images/hardware/cash.png', '/assets/images/hardware/cash.png'], 
    name: 'Inforce APT-410 RJ-11', 
    type: 'Cash Drawer', 
    price: 550000, 
    originalPrice: null,
    sold: 210,
    description: 'Laci uang besi tebal dengan 4 slot uang kertas & 8 slot koin. Terhubung otomatis ke printer struk melalui port RJ-11.',
    specs: ['Heavy Duty Steel', 'RJ-11 Connector', '3-Position Lock', 'Removable Tray']
  },
  { 
    id: 'iware-wd-2rc',
    images: ['/assets/images/hardware/tablet.png', '/assets/images/hardware/tablet.png', '/assets/images/hardware/tablet.png'], 
    name: 'Iware WD-2RC', 
    type: 'Business Tablet', 
    price: 1950000, 
    originalPrice: 2200000,
    sold: 40,
    description: 'Tablet Android performa tinggi yang dioptimalkan khusus untuk aplikasi kasir DM POS. Layar IPS cerah dan baterai yang tahan seharian.',
    specs: ['10" IPS Display', '4GB RAM / 64GB', 'Quad-core CPU', 'Business Build']
  },
];
