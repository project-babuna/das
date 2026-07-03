"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1299157702361305";

const parseMetaParams = (target) => {
  const params = {};

  if (target.dataset.metaContentName) {
    params.content_name = target.dataset.metaContentName;
  }

  if (target.dataset.metaContentCategory) {
    params.content_category = target.dataset.metaContentCategory;
  }

  if (target.dataset.metaValue) {
    params.value = Number(target.dataset.metaValue);
  }

  if (target.dataset.metaCurrency) {
    params.currency = target.dataset.metaCurrency;
  }

  return params;
};

const trackMetaEvent = (eventName, params = {}) => {
  if (!META_PIXEL_ID || typeof window === "undefined" || !window.fbq) {
    return;
  }

  window.fbq("track", eventName, params);
};

export default function MetaPixel() {
  const pathname = usePathname();
  const didTrackInitialPageView = useRef(false);

  useEffect(() => {
    if (!didTrackInitialPageView.current) {
      didTrackInitialPageView.current = true;
      return;
    }

    trackMetaEvent("PageView");
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const trigger = event.target.closest("[data-meta-event]");

      if (!trigger) {
        return;
      }

      trackMetaEvent(trigger.dataset.metaEvent, parseMetaParams(trigger));
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  if (!META_PIXEL_ID) {
    return null;
  }

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
