import Script from 'next/script';
import { ANALYTICS } from '@/config/business';

/**
 * Loads only the trackers that have a real id in the environment. With no ids
 * configured this component renders nothing at all, which is the default state
 * of a fresh checkout — there are no placeholder measurement ids anywhere in
 * this codebase.
 *
 * Every script is `afterInteractive`, so none of them competes with the hero
 * image for bandwidth during the initial load.
 */
export function Analytics() {
  const { ga4, yandexMetrica, clarity } = ANALYTICS;
  if (!ga4 && !yandexMetrica && !clarity) return null;

  return (
    <>
      {ga4 ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4}');`}
          </Script>
        </>
      ) : null}

      {yandexMetrica ? (
        <Script id="yandex-metrica" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');ym(${yandexMetrica},'init',{webvisor:false,clickmap:true,trackLinks:true,accurateTrackBounce:true});`}
        </Script>
      ) : null}

      {clarity ? (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,'clarity','script','${clarity}');`}
        </Script>
      ) : null}
    </>
  );
}
