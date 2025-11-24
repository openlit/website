import { Heart, Users } from 'lucide-react'

export const supportOptions = [
  {
    title: 'Token Supporter',
    icon: Heart,
    description:
      "You're literally counting tokens with us! Your support keeps our servers running, docs updated, and community thriving.",
    amount: '$10/month',
    url: 'https://opencollective.com/openlit/contribute/backers-94435/checkout?interval=month&amount=10&contributeAs=me',
    benefits: [
      '❤️ Our eternal gratitude',
      '🌟 Help keep OpenLIT open-source',
      '🚀 Support faster development',
    ],
  },
  {
    title: 'Context Window Hero',
    icon: Users,
    description:
      "You've expanded our context window! Help us ship faster integrations, squash bugs, and build features the community loves.",
    amount: '$50/month',
    url: 'https://opencollective.com/openlit/contribute/sponsors-94436/checkout?interval=month&amount=50&contributeAs=me',
    benefits: [
      '🏆 Your logo on our GitHub README',
      '🌐 Your logo on our official website',
      '🎯 Shape the future of AI observability',
    ],
  },
]
