import React from 'react';
import { Avatar, Badge, IconButton, Stack, Typography, Box, Tooltip } from '@mui/material';
import { VideoCall as VideoCallIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { transformImage } from '../../lib/features';
import toast from 'react-hot-toast';
import { orange } from '../../constants/color';

const ChatHeader = ({ user, chatId }) => {
  const navigate = useNavigate();

  const handleVideoCall = () => {
    try {
      const url = `${window.location.origin}/chat/${chatId}/call`;
      console.log("Opening video call URL:", url);
      
      const newWindow = window.open(
        url, 
        '_blank', 
        'noopener,noreferrer,width=1280,height=720,allow=camera;microphone'
      );
      
      if (!newWindow) {
        toast.error("Pop-up blocked! Please allow pop-ups for video calls");
      }
    } catch (error) {
      console.error("Video call error:", error);
      toast.error("Failed to start video call");
    }
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        bgcolor: 'white',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        py: 1.5,
        px: 2,
        position: 'relative',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <IconButton 
        onClick={goBack}
        sx={{ 
          display: { xs: 'flex', md: 'none' },
          color: 'text.secondary'
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        sx={{
          '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            boxShadow: '0 0 0 2px white',
            width: 10,
            height: 10,
            borderRadius: '50%'
          }
        }}
      >
        <Avatar 
          src={user?.avatar && transformImage(user.avatar)} 
          alt={user?.name}
          sx={{ 
            width: 45, 
            height: 45,
            border: '2px solid white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />
      </Badge>
      
      <Box flexGrow={1}>
        <Typography variant="subtitle1" fontWeight={600}>
          {user?.name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Online
        </Typography>
      </Box>
      
      <Tooltip title="Video Call">
        <IconButton 
          onClick={handleVideoCall}
          sx={{
            bgcolor: orange,
            color: 'white',
            '&:hover': {
              bgcolor: 'error.dark',
            },
            width: 40,
            height: 40,
          }}
        >
          <VideoCallIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default ChatHeader; 