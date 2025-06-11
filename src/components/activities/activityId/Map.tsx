'use client'

import { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  address: string;
}

export default function Map({ address }: MapProps) {
  useEffect(() => {
    if (!address) return;

    if (document.getElementById('kakao-map-script')) {
      loadMap();
      return;
    }

    const script = document.createElement('script');
    script.id = 'kakao-map-script';
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&autoload=false&libraries=services`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      loadMap();
    };

    function loadMap() {
      if (!window.kakao) return;

      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        if (!container) return;

        const map = new window.kakao.maps.Map(container, {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        });

        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            const marker = new window.kakao.maps.Marker({
              map,
              position: coords,
            });
            map.setCenter(coords);
          }
        });
      });
    }

    // 스크립트 삭제하지 않고 유지 (스토리북에서도 재사용 용이)
    return () => {
      document.head.removeChild(script)
    }

  }, [address]);

  return (
    <div className="p-6">
      <h1 className="text-18-b text-gray-950 mb-1">오시는 길</h1>
      <p className="text-14-m mb-1">{address}</p>
      <div id="map" className="w-67 h-45 rounded-3xl mb-4 border" />
    </div>
  );
}
