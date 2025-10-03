import { RenderMode, ServerRoute } from '@angular/ssr';

// Prerender sırasında dinamik course id parametrelerini üret.
// Basit yaklaşım: JSON backend'i doğrudan fetch edemeyeceğimiz için
// küçük bir statik liste veya (ileride) build öncesi script ile doldurulacak yer.
// Şimdilik güvenli fallback: hiç param dönmezse route SSR (on-demand) çalışır.
// Hata: "route uses prerendering and includes parameters, but getPrerenderParams is missing"
// çözümü: aşağıda getPrerenderParams ekledik.

// İsterseniz bu listeyi build öncesi otomatik üretmek için
// bir node script'i yazıp courses id'lerini json-server'dan alabilirsiniz.
const prerenderCourseIds: string[] = [
  // Örnek statik id'ler; gerçek id'leriniz farklıysa güncelleyin
  '1', '2', '3', '4', '5'
];

export const serverRoutes: ServerRoute[] = [
  {
    path: 'courses/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => prerenderCourseIds.map(id => ({ id }))
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
