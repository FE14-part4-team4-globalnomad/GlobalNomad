"use client";

import { useEffect } from "react";

interface MapProps {
  address: string;
}

// kakao 타입 선언 (전역 but 이 파일 내에서만 사용)
declare global {
  interface Window {
    kakao: KakaoNamespace;
  }

  interface KakaoNamespace {
    maps: {
      load(callback: () => void): void;
      LatLng: new (lat: number | string, lng: number | string) => KakaoLatLng;
      Map: new (container: HTMLElement, options: { center: KakaoLatLng; level: number }) => KakaoMap;
      Marker: new (options: { map: KakaoMap; position: KakaoLatLng }) => KakaoMarker;
      CustomOverlay: new (options: { position: KakaoLatLng; yAnchor: number; content: string }) => KakaoCustomOverlay;
      services: {
        Geocoder: new () => {
          addressSearch(query: string, callback: (result: GeocoderResult[], status: GeocoderStatus) => void): void;
        };
        Status: {
          OK: GeocoderStatus;
        };
      };
      event: {
        addListener(target: unknown, type: string, handler: () => void): void;
      };
    };
  }

  interface KakaoLatLng {
    getLat(): number;
    getLng(): number;
  }

  interface KakaoMap {
    setCenter(latlng: KakaoLatLng): void;
  }

  type KakaoMarker = object;

  interface KakaoCustomOverlay {
    setMap(map: KakaoMap): void;
  }

  type GeocoderResult = {
    x: string;
    y: string;
    address_name?: string;
    [key: string]: unknown;
  };

  type GeocoderStatus = "OK" | "ZERO_RESULT" | "ERROR";
}

export default function KakaoMap({ address }: MapProps) {
  const whiteMarkerSvg = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C7.58902 2 4.00002 5.589 4.00002 9.995C3.97102 16.44 11.696 21.784 12 22C12 22 20.029 16.44 20 10C20 5.589 16.411 2 12 2ZM12 14C9.79002 14 8.00002 12.21 8.00002 10C8.00002 7.79 9.79002 6 12 6C14.21 6 16 7.79 16 10C16 12.21 14.21 14 12 14Z"
        fill="white"
      />
    </svg>
  `;

  useEffect(() => {
    if (!address) return;

    const existingScript = document.getElementById("kakao-map-script");

    const loadMap = () => {
      const { kakao } = window;
      if (!kakao) return;

      kakao.maps.load(() => {
        const container = document.getElementById("map");
        if (!container) return;

        const map = new kakao.maps.Map(container, {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        });

        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result, status) => {
          if (status === kakao.maps.services.Status.OK && result.length > 0) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            const marker = new kakao.maps.Marker({
              map,
              position: coords,
            });

            kakao.maps.event.addListener(marker, "click", () => {
              window.open(`https://map.kakao.com/link/map/선택위치,${result[0].y},${result[0].x}`);
            });

            const overlay = new kakao.maps.CustomOverlay({
              position: coords,
              yAnchor: 1,
              content: `
                <div style="position: relative;">
                  <div style="
                    position: absolute;
                    bottom: 100%;
                    left: calc(50% + 80px);
                    transform: translateX(-50%);
                    display: inline-flex;
                    align-items: center;
                    background: white;
                    border: 2px solid #2D8CFF;
                    border-radius: 999px;
                    padding: 6px 12px;
                    font-weight: bold;
                    font-size: 14px;
                    color: #333333;
                    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
                  ">
                    <div style="
                      width: 24px;
                      height: 24px;
                      background-color: #2D8CFF;
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      margin-right: 8px;
                    ">
                      ${whiteMarkerSvg}
                    </div>
                    <div>${address}</div>
                  </div>
                  <div style="
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 0;
                    border-left: 8px solid transparent;
                    border-right: 8px solid transparent;
                    border-top: 10px solid #2D8CFF;
                  ">
                    <div style="
                      position: absolute;
                      top: -12px;
                      left: -7px;
                      width: 0;
                      height: 0;
                      border-left: 8px solid transparent;
                      border-right: 8px solid transparent;
                      border-top: 10px solid white;
                    "></div>
                  </div>
                </div>
              `,
            });

            overlay.setMap(map);
            map.setCenter(coords);

            const handleResize = () => map.setCenter(coords);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
          }
        });
      });
    };

    if (existingScript && window.kakao) {
      loadMap();
    } else if (!existingScript) {
      const script = document.createElement("script");
      script.id = "kakao-map-script";
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&autoload=false&libraries=services`;
      script.async = true;
      document.head.appendChild(script);
      script.onload = () => loadMap();
    }
  }, [address, whiteMarkerSvg]);

  return (
    <div>
      <h1 className="text-18-b text-gray-950 mb-1">오시는 길</h1>
      <p className="text-14-m mb-1">{address}</p>
      <div id="map" className="w-67 h-45 rounded-3xl mobile:w-33 mobile:h-18" />
    </div>
  );
}