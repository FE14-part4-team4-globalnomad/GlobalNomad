import React from 'react';
import Map from '@/components/activities/activityId/Map';

// 전역 kakao 모킹
if (typeof window !== 'undefined' && !window.kakao) {
  window.kakao = {
    maps: {
      load: (callback: () => void) => callback(),
      Map: class {
        constructor(container: HTMLElement, options: any) {
          // map 초기화 시 필요한 최소한의 구현만
        }
      },
      LatLng: class {
        lat: number;
        lng: number;
        constructor(lat: number, lng: number) {
          this.lat = lat;
          this.lng = lng;
        }
      },
      Marker: class {
        constructor(options: any) {
          // 마커 생성 시 필요한 최소 구현
        }
      },
      services: {
        Geocoder: class {
          addressSearch(address: string, callback: (result: any[], status: string) => void) {
            // 테스트용 가짜 위치 좌표와 상태 반환
            callback([{ y: 37.5665, x: 126.978 }], 'OK');
          }
        },
        Status: {
          OK: 'OK',
        },
      },
    },
  };
}

export default {
  title: 'Components/Map',
  component: Map,
};

export const Default = () => <Map address="서울특별시 종로구 세종대로 175" />;