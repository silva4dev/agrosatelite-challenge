from rest_framework import generics

from farm_base.api.v1.serializers import FarmListSerializer, \
    FarmCreateSerializer, FarmDetailSerializer
from farm_base.models import Farm


class FarmListCreateView(generics.ListCreateAPIView):
    serializer_class = FarmListSerializer

    def get_queryset(self):
        queryset = Farm.objects.filter(is_active=True)
        search_owner_name = self.request.query_params.get('owner_name', None)
        search_owner_document = self.request.query_params.get(
            'owner_document', None)
        search_farm_name = self.request.query_params.get('farm_name', None)
        search_municipality = self.request.query_params.get(
            'municipality', None)
        search_state = self.request.query_params.get('state', None)
        search_id = self.request.query_params.get('id', None)

        if search_owner_name:
            queryset = queryset.filter(
                owner__name__icontains=search_owner_name)
        if search_owner_document:
            queryset = queryset.filter(
                owner__document__icontains=search_owner_document)
        if search_farm_name:
            queryset = queryset.filter(name__icontains=search_farm_name)
        if search_municipality:
            queryset = queryset.filter(
                municipality__icontains=search_municipality)
        if search_state:
            queryset = queryset.filter(state__icontains=search_state)
        if search_id:
            queryset = queryset.filter(id=search_id)

        return queryset

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return FarmListSerializer
        else:
            return FarmCreateSerializer

    def perform_create(self, serializer):
        farm = serializer.save()
        area = float(farm.geometry.area)
        centroid = farm.geometry.centroid
        municipality = farm.municipality
        state = farm.state
        owner = farm.owner
        name = farm.name
        serializer.save(area=area, municipality=municipality, centroid=centroid,
                        state=state, owner=owner, name=name)


class FarmRetrieveUpdateDestroyView(
        generics.RetrieveUpdateDestroyAPIView):
    queryset = Farm.objects.filter(is_active=True)
    serializer_class = FarmDetailSerializer
