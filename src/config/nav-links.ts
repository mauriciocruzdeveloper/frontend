import {
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import interfacesJson from '../interfaces/interfaces.json'

function pascalToCamel(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

const links = Object.keys(interfacesJson).map((key) => {
  return {
    name: `${key}s`,
    href: `/dashboard/${pascalToCamel(key)}s`,
    icon: DocumentDuplicateIcon,
  }
})

export const navLinks = [{
  name: 'Home',
  href: '/dashboard',
  icon: HomeIcon,
}, ...links];
