import type { Dictionary } from '@/lib/i18n/dictionaries';
import { SOCIAL } from '@/config/business';
import { Section, sectionStyles } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { InstagramIcon, YoutubeIcon } from '@/components/ui/Icons';
import { VideoWall } from '@/components/media/VideoWall';
import { videoWallCopy } from '@/components/media/VideoWall.copy';

export function Videos({ dict }: { dict: Dictionary }) {
  return (
    <Section labelledBy="videos-title">
      <SectionHeading
        label={dict.works.label}
        title={dict.proof.videoTitle}
        lead={dict.proof.videoLead}
        id="videos-title"
        wide
      />

      <VideoWall copy={videoWallCopy(dict)} />

      <div className={sectionStyles.foot}>
        <ButtonLink href={SOCIAL.youtube} variant="outline" track="youtube_click">
          <YoutubeIcon size={17} />
          {dict.proof.channelCta}
        </ButtonLink>
        <ButtonLink href={SOCIAL.instagram} variant="ghost" track="instagram_click">
          <InstagramIcon size={17} />
          {dict.common.instagram}
        </ButtonLink>
      </div>
    </Section>
  );
}
