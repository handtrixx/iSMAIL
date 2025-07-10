import React from 'react';
import LoginForm from '@/app/components/login-form';
import Card from '@mui/material/Card';
import { CiMail } from 'react-icons/ci';
import CardContent from '@mui/material/CardContent';
import styles from './styles.module.css';

export default function LoginPage() {
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContainer}>
        <Card variant="outlined">
          <CardContent>
            <div className={styles.loginContent}>
              <div className="d-flex w-100 align-items-center">
              
                  <CiMail size="82px" color="var(--mui-palette-primary-main)" className="me-2" />
              
                <div>
                  <h1 className="my-0 f-style-italic">iSMAIL</h1>
                  <p className="my-0">The Next Generation imapsync</p>
                </div>
              </div>
            </div>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

