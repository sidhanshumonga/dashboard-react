import React from "react";
import "./staticcharts.css";

export default function StaticChart() {
    return (
        <section>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <div className="chart-area bdr-top-s3">
                            <div className="container-chart">
                                <div className="row">
                                    <div className="col-12 col-lg-12">
                                        Chart 1
                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="chart-area bdr-top-s2">
                            <div className="container-chart">
                                <div className="row">
                                    <div className="col-12 col-lg-12">
                                        Chart 2
                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="chart-area bdr-top-s0">
                            <div className="container-chart">
                                <div className="row">
                                    <div className="col-12 col-lg-12">
                                        Chart 3
                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
