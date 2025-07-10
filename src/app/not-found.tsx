// app/not-found.ts
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="d-block text-center">
        <Image
          className="img-fluid pb-5"
          src="/assets/img/notfound.svg"
          alt="404"
          width={280}
          height={280}
        />
        <h2 className="pt-5 pb-5">Page Not Found</h2>
        <p>
          The page you were looking for could not be found.
          <br />
          It might have been removed, renamed, or did not exist in the first
          place.
        </p>
        <div className="d-flex align-items-center justify-content-center">
            <Link className="mt-2 w-fit-content d-block" href="/dashboard">
              Back to Dashboard
            </Link>
          </div>
      </div>
    </div>
  );
}

