from django.contrib.gis.geos import GEOSGeometry
from osgeo import ogr
from rest_framework import serializers
from rest_framework_gis.fields import GeometryField

from farm_base.api.v1.serializers.owner import OwnerDetailSerializer
from farm_base.models import Farm
from farm_base.models import Owner


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = ['id', 'name', 'document', 'document_type']


class FarmListSerializer(serializers.ModelSerializer):
    owner = OwnerSerializer()

    def __init__(self, *args, **kwargs):
        super(FarmListSerializer, self).__init__(*args, **kwargs)
        request = kwargs['context']['request']
        include_geometry = request.GET.get('include_geometry', "false")

        if include_geometry.lower() == "true":
            self.fields['geometry'] = GeometryField(read_only=True)

    class Meta:
        model = Farm
        fields = ['id', 'name', 'centroid', 'area',
                  'municipality', 'state', 'owner']
        read_only_fields = ['id', 'centroid', 'area']


class FarmCreateSerializer(serializers.ModelSerializer):
    def validate_geometry(self, data):
        if data.hasz:
            g = ogr.CreateGeometryFromWkt(data.wkt)
            g.Set3D(False)
            data = GEOSGeometry(g.ExportToWkt())
        return data

    class Meta:
        model = Farm
        fields = ['id', 'name', 'geometry', 'centroid',
                  'area', 'owner', 'municipality', 'state']
        read_only_fields = ['id', 'centroid', 'area']


class FarmDetailSerializer(serializers.ModelSerializer):
    owner = OwnerDetailSerializer(read_only=True)

    class Meta:
        model = Farm
        fields = '__all__'
        read_only_fields = ['name', 'municipality', 'state', 'geometry', 'area',
                            'centroid', 'creation_date', 'last_modification_date', 'is_active', 'owner']
