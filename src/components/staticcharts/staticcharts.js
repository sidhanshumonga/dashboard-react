import React from "react";
import "./staticcharts.css";

export default function StaticChart() {
    return (
        <section>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-4">
                        <div class="chart-area bdr-top-s3">
                            <div class="container-chart">
                                <div class="row">
                                    <div class="col-12 col-lg-12">
                                        Chart 1
                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="chart-area bdr-top-s2">
                            <div class="container-chart">
                                <div class="row">
                                    <div class="col-12 col-lg-12">
                                        Chart 2
                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="chart-area bdr-top-s0">
                            <div class="container-chart">
                                <div class="row">
                                    <div class="col-12 col-lg-12">
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
