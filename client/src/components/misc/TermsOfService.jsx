import React from 'react';
import NavigationBar from '../main/NavigationBarContainer';
import Footer from '../main/Footer';
import './TermsOfService.css';

const TermsOfService = () => (
  <div className="TermsOfService">
    <NavigationBar />
    <div className="content">
      <h1>Terms of Service</h1>

      <h2>Terms</h2>

      <p>
        By accessing the website at <a href="https://www.nuseats.club">https://www.nuseats.club</a>, you are
        agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you
        are responsible for compliance with any applicable local laws. If you do not agree with any of these
        terms, you are prohibited from using or accessing this site. The materials contained in this website
        are protected by applicable copyright and trademark law.
      </p>

      <h2>Use License</h2>

      <p>
        Permission is granted to temporarily download one copy of the materials (information or software) on
        NUS Eats' website for personal, non-commercial transitory viewing only. This is the grant of a license,
        not a transfer of title, and under this license you may not:
      </p>

      <ul>
        <li>
          modify or copy the materials;
        </li>

        <li>
          use the materials for any commercial purpose, or for any public display (commercial or
          non-commercial);
        </li>

        <li>
          attempt to decompile or reverse engineer any software contained on NUS Eats' website;
        </li>

        <li>
          remove any copyright or other proprietary notations from the materials; or
        </li>

        <li>
          transfer the materials to another person or "mirror" the materials on any other server.
        </li>
      </ul>

      <p>
        This license shall automatically terminate if you violate any of these restrictions and may be
        terminated by NUS Eats at any time. Upon terminating your viewing of these materials or upon the
        termination of this license, you must destroy any downloaded materials in your possession whether in
        electronic or printed format.
      </p>

      <h2>Disclaimer</h2>

      <p>
        The materials on NUS Eats' website are provided on an 'as is' basis. NUS Eats makes no warranties,
        expressed or implied, and hereby disclaims and negates all other warranties including, without
        limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
        non-infringement of intellectual property or other violation of rights.
      </p>

      <p>
        Further, NUS Eats does not warrant or make any representations concerning the accuracy, likely results,
        or reliability of the use of the materials on its website or otherwise relating to such materials or on
        any sites linked to this site.
      </p>

      <h2>Limitations</h2>

      <p>
        In no event shall NUS Eats or its suppliers be liable for any damages (including, without limitation,
        damages for loss of data or profit, or due to business interruption) arising out of the use or
        inability to use the materials on NUS Eats' website, even if NUS Eats or a NUS Eats authorized
        representative has been notified orally or in writing of the possibility of such damage. Because some
        jurisdictions do not allow limitations on implied warranties, or limitations of liability for
        consequential or incidental damages, these limitations may not apply to you.
      </p>

      <h2>Accuracy of materials</h2>

      <p>
        The materials appearing on NUS Eats website could include technical, typographical, or photographic
        errors. NUS Eats does not warrant that any of the materials on its website are accurate, complete or
        current. NUS Eats may make changes to the materials contained on its website at any time without
        notice. However NUS Eats does not make any commitment to update the materials.
      </p>

      <h2>Links</h2>

      <p>
        NUS Eats has not reviewed all of the sites linked to its website and is not responsible for the
        contents of any such linked site. The inclusion of any link does not imply endorsement by NUS Eats of
        the site. Use of any such linked website is at the user's own risk.
      </p>

      <h2>Modifications</h2>

      <p>
        NUS Eats may revise these terms of service for its website at any time without notice. By using this
        website you are agreeing to be bound by the then current version of these terms of service.
      </p>

      <h2>Governing Law</h2>

      <p>
        These terms and conditions are governed by and construed in accordance with the laws of Singapore and
        you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
      </p>
    </div>
    <Footer />
  </div>
);

export default TermsOfService;
