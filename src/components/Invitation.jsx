import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Invitation.css';
import Mandala from './Mandala';
import { useLang } from '../i18n';

export default function InvitationModal({ open, onClose }) {
  const { t } = useLang();
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.invite-card',
        { opacity: 0, y: 60, scale: 0.92, rotationX: 12 },
        { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 0.7, ease: 'power3.out' },
      );
      gsap.fromTo(
        '.invite-inner',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power2.out' },
      );
    }, modalRef);
    return () => {
      document.body.style.overflow = prev;
      ctx.revert();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="invite-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={t('nav.invitation')}>
      <div className="invite-card" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <span className="invite-mandala"><Mandala size={240} color="rgba(212,175,55,0.5)" /></span>
        <button className="invite-close" type="button" aria-label="Close" onClick={onClose}>×</button>

        <div className="invite-inner">
          <p className="invite-om">॥ श्री गणेशाय नमः ॥</p>
          <h3 className="invite-title">{t('invite.title')}</h3>
          <p className="invite-p1">{t('invite.p1')}</p>

          <div className="invite-names">{t('invite.names')}</div>
          <p className="invite-mr">{t('invite.mr')}</p>

          <ul className="invite-days">
            <li>{t('invite.when')}</li>
            <li>{t('invite.when2')}</li>
            <li>{t('invite.when3')}</li>
          </ul>

          <p className="invite-where">📍 {t('invite.where')}</p>

          <div className="invite-foot">
            <button className="invite-print" type="button" onClick={() => window.print()}>
              🖨 {t('invite.ctaPrint')}
            </button>
            <button className="invite-goto" type="button" onClick={() => { onClose(); document.querySelector('#rsvp')?.scrollIntoView(); }}>
              RSVP →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}