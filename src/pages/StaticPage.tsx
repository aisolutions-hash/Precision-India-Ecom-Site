import React from 'react';
import { useLocation } from 'react-router-dom';

const pages: Record<string, { title: string; description: string }> = {
  '/industries': {
    title: 'Industries We Serve',
    description: 'From automotive to aerospace, our precision components are trusted across critical industries. We serve automotive, aerospace, defense, medical devices, oil & gas, and general manufacturing sectors with customized engineering solutions.',
  },
  '/services': {
    title: 'Our Services',
    description: 'We offer end-to-end precision engineering services including CNC machining, surface grinding, heat treatment, CNC turning, and quality inspection. Our state-of-the-art facility ensures tight tolerances and consistent quality across every batch.',
  },
  '/about': {
    title: 'About Us',
    description: 'Precision Engineering Works has been a leader in precision component manufacturing since 2010. We are ISO 9001:2015 certified and serve clients across India and globally with a commitment to quality, reliability, and on-time delivery.',
  },
  '/quality': {
    title: 'Quality Control',
    description: 'Our quality assurance process includes dimensional inspection, material testing, surface finish analysis, and hardness testing. Every component is inspected at multiple stages to ensure compliance with specifications.',
  },
  '/capabilities': {
    title: 'Our Capabilities',
    description: 'We operate modern CNC machines, surface grinders, cylindrical grinders, and inspection equipment. Our facility can handle everything from prototype runs to high-volume production with consistent quality.',
  },
  '/careers': {
    title: 'Careers',
    description: 'Join our team of skilled engineers and technicians. We offer competitive compensation, ongoing training, and opportunities for growth in a dynamic manufacturing environment.',
  },
  '/contact': {
    title: 'Contact Us',
    description: 'Get in touch with our team for inquiries, quotes, or technical support. Call us at +91 98222 93688 or email rfq@precisionengg.com. We are located at MIDC, Nagapur, Ahilyanagar, Maharashtra.',
  },
  '/privacy': {
    title: 'Privacy Policy',
    description: 'We are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information when you use our website and services.',
  },
  '/terms': {
    title: 'Terms of Service',
    description: 'These terms govern your use of our website and services. By using our site, you agree to these terms. Please review them carefully before placing an order or submitting a quote request.',
  },
  '/iso': {
    title: 'ISO 9001:2015 Certified',
    description: 'We are ISO 9001:2015 certified, demonstrating our commitment to quality management systems. Our certification ensures consistent quality, continuous improvement, and customer satisfaction.',
  },
};

export default function StaticPage() {
  const { pathname } = useLocation();
  const page = pages[pathname];

  if (!page) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
      <h1 className="text-4xl font-bold text-zinc-900 tracking-tight mb-6">{page.title}</h1>
      <div className="w-16 h-1 bg-[#D81F26] mb-8" />
      <p className="text-zinc-600 text-lg leading-relaxed">{page.description}</p>
    </div>
  );
}
