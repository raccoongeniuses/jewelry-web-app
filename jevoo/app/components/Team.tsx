type TeamMember = {
  id: string;
  name: string;
  position: string;
  image: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    google?: string;
  };
};

const teamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Jonathan Scott',
    position: 'CEO',
    image: '/assets/img/team/team_member_1.jpg',
    socialLinks: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      google: '#',
    },
  },
  {
    id: 'team-2',
    name: 'Oliver Bastin',
    position: 'Designer',
    image: '/assets/img/team/team_member_2.jpg',
    socialLinks: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      google: '#',
    },
  },
  {
    id: 'team-3',
    name: 'Erik Jonson',
    position: 'Developer',
    image: '/assets/img/team/team_member_3.jpg',
    socialLinks: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      google: '#',
    },
  },
  {
    id: 'team-4',
    name: 'Jon Doe',
    position: 'Marketing Officer',
    image: '/assets/img/team/team_member_4.jpg',
    socialLinks: {},
  },
];

export default function Team() {
  return (
    <div className="team-area section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title text-center">
              <h2 className="title">Our Team</h2>
              <p>Accumsan vitae pede lacus ut ullamcorper sollicitudin quisque libero</p>
            </div>
          </div>
        </div>
        <div className="row mbn-30">
          {teamMembers.map((member) => (
            <div key={member.id} className="col-lg-3 col-md-6 col-sm-6">
              <div className="team-member mb-30">
                <div className="team-thumb">
                  <img src={member.image} alt={member.name} />
                  <div className="team-social">
                    {member.socialLinks.facebook && (
                      <a href={member.socialLinks.facebook}>
                        <i className="fa fa-facebook"></i>
                      </a>
                    )}
                    {member.socialLinks.twitter && (
                      <a href={member.socialLinks.twitter}>
                        <i className="fa fa-twitter"></i>
                      </a>
                    )}
                    {member.socialLinks.linkedin && (
                      <a href={member.socialLinks.linkedin}>
                        <i className="fa fa-linkedin"></i>
                      </a>
                    )}
                    {member.socialLinks.google && (
                      <a href={member.socialLinks.google}>
                        <i className="fa fa-google-plus"></i>
                      </a>
                    )}
                  </div>
                </div>
                <div className="team-content text-center">
                  <h6 className="team-member-name">{member.name}</h6>
                  <p>{member.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
