import MetricChart from "../../components/charts/MetricChart";
import { productLikeData, productVisitData } from "../../utils/api";



const Analytics = () => {
  return (
    <div className="w-full min-h-screen p-10 bg-gray-100">
      <h1 className="text-2xl font-semibold mb-6">Analytics</h1>

<div className="flex flex-col gap-6">
<MetricChart
  title="Product Likes"
  queryKey={["productLikes"]}
  queryFn={productLikeData}
  valueKey="count"
  labelKey={(item) => item.month || item.day}
  yAxisLabel="Likes"
  color="#0d6efd"
  dataKey="like" 
/>

<MetricChart
  title="Product Visits"
  queryKey={["productVisit"]}
  queryFn={productVisitData}
  valueKey="count"
  labelKey={(item) => item.month || item.day}
  yAxisLabel="Visits"
  color="#198754"
  dataKey="visit" 
/>
</div>


    </div>
  );
};

export default Analytics;
