import { Button } from '@mui/material';
import { withStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';

const styles = {
    show: {
        fontSize: '20px',
        transition: "0.3s",
    },
    hide: {
        fontSize: '20px',
        display: 'none',
        // backgroundColor: "transparent",
        transition: "0.3s",
    }
}

function ScrollTopButton(props: any) {
    const [show, setShow] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = (e: any) => {
        if (window.pageYOffset < 300) setShow(false)
        else setShow(true)
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <Button onClick={scrollToTop}>
            <FaArrowCircleUp size={50}
                display={show ? "block" : "none"} />
        </Button>
    )
}

export default withStyles(styles)(ScrollTopButton);