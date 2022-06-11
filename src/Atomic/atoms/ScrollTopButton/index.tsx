import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';



function CustomScrollTopButton(props: any) {
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
            <FaArrowCircleUp size={50} fontSize="20px" display={show ? "block" : "none"} />
        </Button>
    )
}

export default React.memo(CustomScrollTopButton);