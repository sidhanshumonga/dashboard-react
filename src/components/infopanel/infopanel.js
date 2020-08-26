import React from "react";
import "./infopanel.css";

export default function InfoPanel() {
    const [acc1, setAcc1] = React.useState(false)
    const [acc2, setAcc2] = React.useState(false)
    const [acc3, setAcc3] = React.useState(false)

    return (
        <section>
            <div className="container-fluid my-4">
                <div className="row">
                    <div className="col-8 text-left p-3 px-4">
                        <div className="feature-area">
                            <h3>Traditional medicine in the South-East Asia</h3>
                            <p>People in the WHO South-East Asia Region have a long history of using traditional medicine for a wide range of health conditions. In some areas, traditional therapies are the main or even only source of health care, particularly in remote areas.</p>
                            <p>The majority of Member States in the South-East Asia Region have integrated traditional medicine into their national health-care delivery systems to varying degrees.</p>
                            <p>Following the Delhi Declaration on Traditional Medicine in 2013, and endorsement of the WHO Traditional Medicine Strategy 2014–2023, a regional action plan on traditional medicine was developed in October 2015. This has five areas of action:</p>
                            <ul>
                                <li>Traditional medicine system monitoring</li>
                                <li>Catalyzing research on Traditional medicine system organization and management</li>
                                <li>Capacity-building of Traditional medicine practitioners/workforce</li>
                                <li>Adverse events reporting systems</li>
                                <li>Effective communication</li>
                            </ul>

                        </div>


                    </div>
                    <div className="col-4 px-4">
                        <div className="feature-sidebar">
                            <p className="section-header">Technical links</p>
                            <button className={"accordion " + (acc1 ? "active" : "")} onClick={() => setAcc1(!acc1)}>Key documents</button>
                            <div className="text-left panel" style={{ maxHeight: acc1 ? "72px" : null }}>
                                <a href="#">WHO Traditional Medicine Strategy 2014-2023</a>
                                <a href="#">WHO Global Report on Traditional and Complementary Medicine 2019</a>
                            </div>
                            <button className={"accordion " + (acc2 ? "active" : "")} onClick={() => setAcc2(!acc2)}>WHO Resolutions </button>
                            <div className="text-left panel" style={{ maxHeight: acc2 ? "72px" : null }}>
                                <a href="#">WHA67.18 (2014) Traditional medicine  </a>
                                <a href="#">WHA62.13 (2009) Traditional medicine </a>
                            </div>
                            <button className={"accordion " + (acc3 ? "active" : "")} onClick={() => setAcc3(!acc3)}>Related links</button>
                            <div className="text-left panel" style={{ maxHeight: acc3 ? "72px" : null }}>
                                <a href="#">Astana Declaration on Primary Health Care </a>
                                <a href="#">United Nations: Political declaration of the high-level meeting on universal health coverage </a>
                                <a href="#">Framework on integrated, people-centred health services </a>
                                <a href="#">WHA69.24 Strengthening integrated people-centred health services </a>
                                <a href="#">International Classification of Diseases 11th Revision </a>
                                <a href="#">WHA72.6 Global action on patient safety </a>
                                <a href="#">WHO guidelines for selecting marker substances of herbal origin for quality control of herbal medicines </a>
                                <a href="#">WHO guidelines on good herbal processing practices for herbal medicines </a>
                                <a href="#">Guidelines on good manufacturing practices for the manufacture of herbal medicines  </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container-fluid my-4">
                <div className="row">
                    <div className="col-12">
                        <div className="ourwork-area">
                            <h3>Traditional medicine in the South-East Asia</h3>
                            <div className="row">
                                <div className="col-3">
                                    <a href="#">
                                        <div className="thumbs" style={{ backgroundImage: `url(${require("../../assets/ncds-children-playing.jpg")})` }}></div>
                                Reducing modifiable risk factors for noncommunicable diseases
                        </a>
                                </div>

                            </div>


                        </div>


                    </div>

                </div>
            </div>

            <div className="container-fluid my-4">
                <div className="row">
                    <div className="col-4 text-left">
                        <div className="related-health-area">
                            <h3>Related Health Topics</h3>
                            <div className="vertical-box">
                                <div className="thumbs thumbs-img" style={{ backgroundImage: `url(${require("../../assets/universal-health-covergae.jpg")})` }}></div>
                                <a href="#">Universal health coverage</a>
                            </div>

                        </div>
                    </div>

                    <div className="col-4 text-left">
                        <div className="important-link-area">
                            <h3>Important links</h3>
                            <ul>
                                <li><a href="#">TRM in WHO Headquarters (HQ)</a></li>
                                <li><a href="#">TRM in Western Pacific Region (WPRO)</a></li>
                                <li><a href="#">TRM in Eastern Mediterranean Region (EMRO)</a></li>
                                <li><a href="#">WHO Collaborating Centres for Traditional Medicine</a></li>
                                <li>Bangladesh- <a href="#">Directorate General of Health Services Website</a></li>
                                <li>Bhutan- <a href="#">National Institute of Traditional Medicine Website</a></li>
                                <li>India- <a href="#">Ministry of AYUSH website</a>
                                    <ul>
                                        <li><a href="#">Ayurveda Research Council</a></li>
                                        <li><a href="#">Unani Research Council</a></li>
                                        <li><a href="#">Homoeopathy Research Council</a></li>
                                        <li><a href="#">Yoga & Naturopathy Research Council</a></li>
                                        <li><a href="#">Siddha Research Institute</a></li>
                                        <li><a href="#">National Institute of Ayurveda</a></li>
                                        <li><a href="#">National Institute of Unani Medicine</a></li>
                                        <li><a href="#">National Institute of Siddha</a></li>
                                        <li><a href="#">National Institute of Homoeopathy</a></li>
                                        <li><a href="#">National Institute of Naturopathy</a></li>
                                        <li><a href="#">National Institute of Yoga</a></li>
                                        <li><a href="#">National Medicinal Plants Board</a></li>
                                        <li><a href="#">Pharmacopoieal Laboratory for Indian Medicine</a></li>
                                        <li><a href="#">Regulatory Council of Indian Medicine</a></li>
                                        <li><a href="#">Regulatory Council of Homeopathy</a></li>
                                        <li><a href="#">Yoga related best articles</a></li>
                                    </ul>
                                </li>
                                <li>Indonesia- <a href="#">Badan Penelitian & Pengembangan Kesehatan website</a></li>
                                <li>Myanmar- <a href="#">Department of Traditional Medicine webpage</a></li>
                                <li>Nepal- <a href="#">Ministry of Health website</a></li>
                                <li>Sri Lanka- <a href="#">National Institute of Traditional Medicine website</a></li>
                                <li>Thailand- <a href="#">Ministry of Public Health website</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-4 text-left">
                        <div className="publication-area">
                            <h3>Featured publications</h3>
                            <div className="vertical-box">
                                <a href="#">Pharmacovigilance for traditional medicine products: Why and how?</a>
                                <div className="publication-links"> <span> 16 January 2018 | <a href="#"><i className="fa fa-file-pdf-o"></i> Download</a></span> </div>
                            </div>

                            <div className="vertical-box">
                                <a href="#">Core and Reference Indicators for Monitoring Traditional and Complementary Medicine in South-East As...</a>
                                <div className="publication-links"> <span> 10 November 2017 | <a href="#"><i className="fa fa-file-pdf-o"></i> Download</a></span> </div>
                            </div>

                            <div className="vertical-box">
                                <a href="#">The Pharmacovigilance System for Traditional Medicine in Thailand</a>
                                <div className="publication-links"> <span> 4 September 2017 | <a href="#"><i className="fa fa-file-pdf-o"></i> Download</a></span> </div>
                            </div>

                            <div className="vertical-box">
                                <a href="#">Regional workshop to share experience and evidence on appropriate integration of traditional medicin...</a>
                                <div className="publication-links"> <span> 21 November 2016 | <a href="#"><i className="fa fa-file-pdf-o"></i> Download</a></span> </div>
                            </div>

                            <div className="vertical-box">
                                <a href="#">WHO traditional medicine strategy: 2014-2023</a>
                                <div className="publication-links"> <span> 29 October 2013 | <a href="#"><i className="fa fa-file-pdf-o"></i> Download</a></span> </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
