import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-purple-900 text-white text-center p-6 mt-12">
            <h3 className="text-xl font-bold mb-2">RCB jewelry's & Pawn shop</h3>
            <p className="text-sm opacity-75">&copy; {new Date().getFullYear()} All rights reserved. Your trusted partner for quality and value.</p>
        </footer>
    );
};

export default Footer;
