import Image from 'next/image';

export default function Loading() {
  return (
    <div className="d-flex vh-100 align-items-center justify-content-center">
      <Image
        src="/assets/img/heartbeat_web.gif"
        alt="CDFox"
        width={384}
        height={384}
        unoptimized
      />
    </div>
  );
}
