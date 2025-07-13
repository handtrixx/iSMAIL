import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export const revalidate = 300;

export const metadata = {
  title: 'Accounts | iSMAIL',
};

export default async function Page() {
  return (
    <Container maxWidth="lg">
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontStyle: 'italic',
            mb: 1,
            color: 'primary.main'
          }}
        >
          Accounts
        </Typography>
        <Typography 
          variant="h6" 
          component="p" 
          sx={{ 
            color: 'text.secondary',
            mb: 0
          }}
        >
          eMail Management
        </Typography>
      </Box>

      {/* Main Content Grid using Box */}
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)'
        },
        gap: 3,
        mb: 4
      }}>
        {/* Welcome Card */}
        <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1', md: '1' } }}>
          <Card elevation={2}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Welcome
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Welcome to your email management dashboard. Here you can manage
                your emails, view statistics, and configure your settings.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained">
                Get Started
              </Button>
              <Button size="small" variant="outlined">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Box>

        {/* Stats Card */}
        <Card elevation={2}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Email Stats
            </Typography>
            <Typography variant="body2" color="text.secondary">
              View your email statistics including unread messages,
              sent emails, and storage usage.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained">
              View Stats
            </Button>
            <Button size="small" variant="outlined">
              Export
            </Button>
          </CardActions>
        </Card>

        {/* Settings Card */}
        <Card elevation={2}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Settings
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Configure your email accounts, notification preferences,
              and other application settings.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained">
              Configure
            </Button>
            <Button size="small" variant="outlined">
              Help
            </Button>
          </CardActions>
        </Card>
      </Box>

      {/* Additional Content Section */}
      <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          Quick Actions
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="contained" color="primary">
            Compose Email
          </Button>
          <Button variant="outlined" color="primary">
            Check Inbox
          </Button>
          <Button variant="outlined" color="secondary">
            Manage Accounts
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}