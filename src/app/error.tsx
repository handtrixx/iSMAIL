// app/error.js
"use client";
import Link from 'next/link';
import Image from 'next/image';

export default function ErrorPage() {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="d-block text-center">
        <Image
          className="img-fluid pb-5"
          src="/assets/img/error.svg"
          alt="error"
          width={280}
          height={280}
        />
        <h2 className="pt-5 pb-5">Service Unavailable</h2>
        <p>
          The service you requested is not available at this time.
          <br />
          if the issue is still present, please contact the owner at{' '}
          <a href="mailto:cdf@bbraun.com">cdf@bbraun.com</a>.
        </p>

        <div className="d-flex align-items-center justify-content-center">
          <Link className="mt-2 w-fit-content d-block" href="/dashboard">
            back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

